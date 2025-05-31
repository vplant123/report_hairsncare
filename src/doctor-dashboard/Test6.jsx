import React, { useState, useEffect } from "react";
import DoctorPrescribe from "../doctor-dashboard/analysis/DoctorPrescribe"; // Adjust the import path as needed
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllProductAsync } from "../../products/productSlice";
import BASE_URL from "../Config";
import { toast } from "react-toastify";

let kits = [
  {
    _id: "668c64a666655468f5b81771",
    name: "Jj",
    price: 344,
    description: "description",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720732501/hair-assessment/apqmltj5ixnbgxsjxm0q.jpg",
    ],
    __v: 1,
    userReview: [],
  },
  {
    _id: "668cd29666655468f5b8178e",
    name: "ne med",
    price: 45,
    description: "hksjko",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720504980/hair-assessment/lknibvme4r6jkikgx0mh.jpg",
    ],
    __v: 1,
    longDes: "<p><strong>hh</strong></p>",
    userReview: [],
  },
  {
    userReview: [],
    _id: "668cf10f66655468f5b817d3",
    name: "Bhim",
    price: 50,
    description: "Bbbb",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720512777/hair-assessment/bofe8g0l2gct12kzmx9f.jpg",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668cf11866655468f5b817db",
    name: "Bhim",
    price: 50,
    description: "Bbbb",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720512791/hair-assessment/ci3yi9m4rpojzjtjms58.jpg",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668cf22a66655468f5b817ec",
    name: "Ddd",
    price: 222,
    description: "Dfd",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720513066/hair-assessment/zc7156jjewzwir5uwvl2.jpg",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b802f9340b4889333c9",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613760/hair-assessment/ifd31l4fcsstwucph70d.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b912f9340b4889333d0",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613776/hair-assessment/npufquba6s8y8ya6hflu.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b912f9340b4889333d8",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613776/hair-assessment/ybkjnapiobjgtbdwpyhs.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b922f9340b4889333e1",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613778/hair-assessment/k7nf7apmiqap6bpvhyld.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b942f9340b4889333eb",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613780/hair-assessment/td1ikkjf7a6nb5f4nygn.webp",
    ],
    __v: 0,
  },
  {
    _id: "668e7bd22f9340b488933400",
    name: "Bh12",
    price: 500,
    description:
      "Product Description: TaB Hairetin is a nutritional supplement used to provide vital nutrients for healthy hair, skin and nails. It contains various vitamins, minerals, amino acids, and plant extracts as active ingredients which are essential for the growth and maintenance of healthy hair.\nBENEFITS \n•\tEnhances the tensile strength of hair.\n•\tPromotes the stimulation of hair follicles.\n•\tProvides nourishment to hair.\n•\tBoosts the production of keratin for stronger hair.\n•\tPlays a vital role to increase hair volume.\n•\tHelps to regulate overall hair health.\nDosage & Repetition: Follow the usage instructions provided by Hairsncares Specialist\nSIDE EFFECTS\nConsult your doctor if you experience any unusual side effects.\nSafety Information:\n•\tCarefully read the label before using the product.\n•\tKeep out of the reach of children.\n•\tStore in a cool and dry place, away from direct light.\nKEY COMPOSITION\nFenugreek 50mg, Pine bark 10mg, Melatonin 570mg, DHT BLOCKER BLEND 570MG, Beta Sitosterol 200MG, Pumpkin Seed Extract 100, Quercetin 10MG, EGCG (Epigallocatechin 3 Gallate) 50MG, Rosemarry Extract 100MG, Proanthocynadins 30MG, Stinging Nettle 50MG, Tomato Extract 30MG, Biotin (% RDA 100) 30MG, L Arginine 250MG, Inositol 50MG, Gamma Linolenic Acid 30MG, Ferrous Fumarate (% RDA 97.05)50MG, Calcium Pantothenate (%RDA 100)100MG, Grape Seed Extract 100MG, C-CYSTEINE 250MG, VITAMIN B12 100MCG\n",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613841/hair-assessment/ew1qfzphmylsirfdo1vt.jpg",
    ],
    __v: 1,
    longDes: "<ol><li>Bbnn</li></ol>",
    userReview: [],
    discount: "50",
  },
  {
    userReview: [],
    _id: "6690604b4bca31fd97eaa415",
    name: "name",
    price: 23,
    description: "jhkihk",
    kit: [],
    src: ["imageData.imageUrl"],
    __v: 0,
  },
  {
    userReview: [],
    _id: "66910f8c4bca31fd97eb2abc",
    name: "hii",
    price: 443,
    description: "ffsfsf",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720782731/hair-assessment/ftwtputhibkty0tdsert.png",
    ],
    __v: 0,
  },
  {
    _id: "6694ee880f6e81b9d30ac4ad",
    name: "Vb",
    price: 100,
    description: "Ttg",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1721036423/hair-assessment/tbjq8fjuth8kcqebjzqf.jpg",
    ],
    longDes: "<p>Gh</p>",
    stock: "88",
    userReview: [],
    discount: "50",
    __v: 0,
  },
  {
    _id: "6694efbf0f6e81b9d30ac4bc",
    name: "Bh19",
    price: 16,
    description: "Av",
    kit: ["TEST22", "Bhim33", "Vb33"],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1721036734/hair-assessment/wxbapwezlcxaujebai0c.jpg",
    ],
    longDes: "<p>Wj</p>",
    stock: "16",
    userReview: [],
    discount: "",
    __v: 0,
  },
];

// import { fetchAllProduct } from "../../products/ProductsApi";

export default function Test6({ selectedOptions, setSelectedOptions }) {
  const [currentKits, setCurrentKits] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [newMedicine, setNewMedicine] = useState("");
  const [addedMedicines, setAddedMedicines] = useState([]);
  const [kitItems, setKitItems] = useState([]);

  // Initialize prescriptions with pre-selected medicines
  useEffect(() => {
    if (selectedOptions?.medicines?.length > 0) {
      const initialPrescriptions = {};
      selectedOptions.medicines.forEach((medicine) => {
        initialPrescriptions[medicine.name] = {
          route: medicine.route || "Oral",
          subCategory: medicine.subCategory || "Tablets",
          quantity: medicine.quantity || "1",
          dosage: medicine.dosage || "",
          frequency: medicine.frequency || "Daily at night",
          when: medicine.when || "Before food",
          duration: medicine.duration || "1 month",
          instructions: medicine.instructions || "",
        };
      });
      setPrescriptions(initialPrescriptions);
    }
  }, [selectedOptions]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/product`);
        const data = await response.json();
        setKitItems(data.message);

        // Pre-select medicines from selectedOptions
        if (selectedOptions?.medicines?.length > 0) {
          const preSelectedKits = data.message.filter((kit) =>
            selectedOptions.medicines.some(
              (medicine) =>
                medicine.name === kit.name || kit.kit.includes(medicine.name)
            )
          );
          setCurrentKits(preSelectedKits);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedOptions]);

  const handleCheckboxChange = (kit) => {
    setCurrentKits((prev) =>
      prev.some((selectedKit) => selectedKit._id === kit._id)
        ? prev.filter((selectedKit) => selectedKit._id !== kit._id)
        : [...prev, kit]
    );
  };

  const savePrescription = () => {
    // Only update the medicines that are in selectedOptions
    const formattedMedicines = selectedOptions.medicines.map((medicine) => ({
      ...medicine,
      ...prescriptions[medicine.name],
    }));

    if (setSelectedOptions) {
      setSelectedOptions((prev) => ({
        ...prev,
        medicines: formattedMedicines,
      }));
    }
    toast.success("Medicine instructions updated in prescription");
  };

  const handleAddMedicine = () => {
    if (newMedicine.trim()) {
      setAddedMedicines((prev) => [...prev, newMedicine.trim()]);
      setNewMedicine("");
    }
  };

  return (
    <>
      <h2 className="diag1">Medicines</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#90ff90",
          padding: "1rem",
        }}
      >
        {kitItems?.map((kit) => (
          <div
            key={kit._id}
            style={{
              display: "flex",
              width: "50%",
              gap: "1rem",
              alignItems: "baseline",
              border: "1px solid black",
            }}
          >
            <label
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "baseline",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={currentKits.some(
                  (selectedKit) => selectedKit._id === kit._id
                )}
                onChange={() => handleCheckboxChange(kit)}
              />
              <div>
                <h2>{kit.name}</h2>
                {kit.kit.length > 0 && (
                  <div>
                    {kit.kit.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>

      {selectedOptions?.medicines?.length > 0 && (
        <div>
          <h2>Instructions for Selected Medicines</h2>
          <DoctorPrescribe
            medicines={selectedOptions.medicines.map(med => med.name)}
            prescriptions={prescriptions}
            setPrescriptions={setPrescriptions}
          />
          <button 
            onClick={savePrescription}
            style={{ 
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#45a049";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#4CAF50";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Update Instructions
          </button>
        </div>
      )}
    </>
  );
}
