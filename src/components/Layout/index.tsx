import Footer from "components/Footer";
import Header from "components/Header";
import { Roboto_Condensed } from "next/font/google";
import BottomNavigation from "./BottomNavigation";
import { useWindowSize } from "usehooks-ts";
import NHeader from "./Header";
const roboto = Roboto_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "300", "700"],
  variable: "--font-roboto",
});
export default function Layout({ children }: any) {
  const { width } = useWindowSize();
  return (
    <main className={`bg-gray-50 max-w-screen ${roboto.variable}`}>
      {width < 1280 ? <NHeader /> : <Header />}
      <div className="min-h-[70vh] text-text-primary relative pt-14 pb-20 xl:pt-0 xl:pb-0">
        {children}
      </div>
      {width < 1280 ? <BottomNavigation /> : <Footer />}
    </main>
  );
}
