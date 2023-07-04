import useAuthModal from "@/hooks/useAuthModal";
import Footer from "./Footer";
import ServiceList from "./ServiceList";

const Landing = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  
    const container = document.getElementById('services');
    const containerTop = container?.offsetTop || 0;
  
    window.scrollTo({
      top: containerTop,
      behavior: 'smooth',
    });
  };

  const services = [
    {
      id: 1,
      title:"Decoration",
      description:"Plan your wedding your way",
      img_uri:"https://www.paperlesspost.com/blog/wp-content/uploads/080822_Blog_DecorationsForAnOutdoorWedding_01-hero.png"
    },
    {
      id: 2,
      title:"Photography Service",
      description:"Make your wedding memorable",
      img_uri:"https://nitinaroraphotography.com/wp-content/uploads/2022/02/henna_shashwat-98.jpg"
    },
    {
      id: 3,
      title:"Catering Service",
      description:"Make your wedding memorable",
      img_uri:"https://celebrationsmenu.com/wp-content/uploads/2019/07/Fotolia_247307424_Subscription_Monthly_M.jpg"

    },
    {
      id: 4,
      title:"Mehndi",
      description:"Plan your wedding your way",
      img_uri:"https://www.aurusjewels.com/cdn/shop/articles/Mehndi_in_Indian_weddings.jpg?v=1676727334"
    },
    {
      id: 5,
      title:"Makeup & Hair Styling",
      description:"Make your wedding memorable",
      img_uri:"https://selectvenue.in/blog/wp-content/uploads/2022/12/Videos-Thatll-Make-You-Master-South-Indian-Bridal-Makeup.jpg"
    },
    {
      id: 6,
      title:"Venue",
      description:"Make your wedding memorable",
      img_uri:"https://im.idiva.com/content/2022/Sep/5-1_63240d1433f39.png"

    }
  ]

  const authModal = useAuthModal();
  return ( 
    <div className="relative h-full w-full bg-[url('/images/couple.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="flex justify-between px-12 py-5">
          <div className="text-white font-bold text-xl">My Logo</div>
          <div className="text-black font-semibold cursor-pointer bg-amber-400 rounded-full p-3"><a href="#services" onClick={scrollToSection}>Services</a></div>
        </nav>
        <div className=" h-5/6 flex flex-col items-center justify-center gap-4">
          <div className="font-semibold text-3xl text-white">
          The Poetry of Love
          </div>
          <div className=" font-thin text-xl text-gray-100">
          Start your journey to perfect wedding!
          </div>
          <div>
          <button 
            className="bg-transparent border border-white-500 px-5 py-2 text-white hover:bg-amber-600 hover:text-white transition-colors duration-300"
            disabled={false}
            type={"button"}
            onClick={authModal.onOpen}
          >
            ENTER →
          </button>
          </div>
        </div>
      </div>
      <ServiceList services={services} />
      <Footer />
    </div>
  );
}
 
export default Landing;