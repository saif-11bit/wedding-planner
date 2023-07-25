import Card from './Card';

interface Service {
  id: number;
  service_name: string;
  about: string;
  image_url: string;
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div className=' bg-zinc-900'>
      <div id="services" className="text-white text-4xl font-bold pt-10 ml-10">Our <span className=" text-amber-600">Services</span></div>
      <div className="flex flex-wrap justify-center cards mt-5 ml-10">
      {services.map((service) => (
        <Card
          id={service.id}
          title={service.service_name}
          description="thi is des"
          img_uri={service.image_url}
        />
      ))}
      </div>
    </div>
  );
};

export default ServiceList;
