import { img } from "framer-motion/client";


  import dyanbruce from "../AdminDashboard/Assets/dyanbruce.png";


export default function NewEnquiries() {




  const enquiries = [
    {
      name: "Dyan Bruce",
      message: "Happy to collaborate with you!",
      image: dyanbruce,
    },
    {
      name: "Dyan Bruce",
      message: "Happy to collaborate with you!",
      image: dyanbruce,
    },
    {
      name: "Dyan Bruce",
      message: "Happy to collaborate with you!",
      image: dyanbruce,
    },
    {
      name: "Dyan Bruce",
      message: "Happy to collaborate with you!",
      image: dyanbruce,
    },
  ];

  return (
    <div className="max-w-md p-4 bg-white shadow-md rounded-lg h-full m-3 w-full">
      <h2 className="text-lg font-semibold mb-4">New Enquiries</h2>
      <div className="space-y-4">
        {enquiries.map((enquiry, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
          >
            <img
              src={enquiry.image}
              alt={enquiry.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{enquiry.name}</p>
              <p className="text-gray-600 text-sm">{enquiry.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}


