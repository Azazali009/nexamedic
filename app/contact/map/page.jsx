export default function Page() {
  return (
    <div className="min-h-screen">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        className="min-h-screen w-full"
        src="https://www.google.com/maps?q=Bernstrasse+18,+2555+Brügg,+Switzerland&output=embed"
        allowFullScreen
      />
    </div>
  );
}
