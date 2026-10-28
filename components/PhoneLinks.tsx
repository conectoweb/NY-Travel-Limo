const phoneNumbers = [
  { label: "516-256-2892", href: "tel:5162562892" },
  { label: "718-397-1333", href: "tel:7183971333" },
];

export function PhoneLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "flex flex-col gap-3" : "flex flex-wrap gap-x-5 gap-y-1"}>
      {phoneNumbers.map((phone) => (
        <li key={phone.href}>
          <a
            className="whitespace-nowrap font-semibold transition-colors hover:text-brand-secondary"
            href={phone.href}
          >
            {phone.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
