export const GOOGLE_MAPS_PROFILE_URL = "https://maps.app.goo.gl/DdHar5D8wdmmSgbZ8";

export type GoogleReview = {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text: string;
};

export type GoogleReviewsData = {
  configured: boolean;
  rating?: number;
  userRatingsTotal?: number;
  googleMapsUrl: string;
  reviews: GoogleReview[];
};

/**
 * Server-only function to securely fetch Google Maps reviews for NY Travel Limo.
 * Keeps GOOGLE_MAPS_API_KEY strictly on the server and avoids exposing it to the client.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  const placeId = process.env.GOOGLE_MAPS_PLACE_ID?.trim();

  // If credentials or Place ID are missing, return unconfigured state without fake reviews.
  if (!apiKey || !placeId) {
    return {
      configured: false,
      googleMapsUrl: GOOGLE_MAPS_PROFILE_URL,
      reviews: [],
    };
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "reviews,rating,user_ratings_total,url");
    url.searchParams.set("key", apiKey);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache on server for 1 hour
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Google Places API returned status ${response.status}`);
      return {
        configured: true,
        googleMapsUrl: GOOGLE_MAPS_PROFILE_URL,
        reviews: [],
      };
    }

    const data = (await response.json()) as {
      status?: string;
      result?: {
        rating?: number;
        user_ratings_total?: number;
        url?: string;
        reviews?: Array<{
          author_name?: string;
          author_url?: string;
          profile_photo_url?: string;
          rating?: number;
          relative_time_description?: string;
          text?: string;
        }>;
      };
    };

    if (data.status !== "OK" || !data.result) {
      console.warn("Google Places API response status:", data.status);
      return {
        configured: true,
        googleMapsUrl: data.result?.url || GOOGLE_MAPS_PROFILE_URL,
        reviews: [],
      };
    }

    const reviews: GoogleReview[] = (data.result.reviews || [])
      .filter((r): r is { author_name: string; rating: number; text: string } & typeof r =>
        Boolean(r.author_name && typeof r.rating === "number" && r.text?.trim())
      )
      .map((r) => ({
        author_name: r.author_name,
        author_url: r.author_url,
        profile_photo_url: r.profile_photo_url,
        rating: r.rating,
        relative_time_description: r.relative_time_description,
        text: r.text.trim(),
      }));

    return {
      configured: true,
      rating: data.result.rating,
      userRatingsTotal: data.result.user_ratings_total,
      googleMapsUrl: data.result.url || GOOGLE_MAPS_PROFILE_URL,
      reviews,
    };
  } catch (error) {
    console.error("Error fetching Google Maps reviews:", error);
    return {
      configured: true,
      googleMapsUrl: GOOGLE_MAPS_PROFILE_URL,
      reviews: [],
    };
  }
}

