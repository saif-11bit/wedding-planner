import Card from './Card';

interface Service {
  id: number;
  title: string;
  description: string;
  img_uri: string;
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div>
      <div id="services" className="text-white text-4xl font-bold mt-10 ml-10">Our <span className=" text-amber-600">Services</span></div>
      <div className="flex flex-wrap justify-center cards mt-5 ml-10">
      {services.map((service) => (
        <Card
          id={service.id}
          title={service.title}
          description={service.description}
          img_uri={service.img_uri}
        />
      ))}
      </div>
    </div>
  );
};

export default ServiceList;
