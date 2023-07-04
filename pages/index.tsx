import ModalProvider from "@/providers/ModalProvider";
import Landing from "@/components/landing";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <ModalProvider />
      <ScrollToTop />
      <Landing />
    </>
  )
}
