const ADDRESS = "Counselor's Street Block2B1 Njengang, Bamenda, Cameroon";

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-gray">
      <iframe
        title="SoliiBridge location in Bamenda"
        src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
        width="100%"
        height="280"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
