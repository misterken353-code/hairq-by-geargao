import { notFound } from "next/navigation";
import BookPage from "../BookingPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BookPageWrapper({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/salons/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const { salon } = await res.json();
  return <BookPage salon={salon} />;
}
