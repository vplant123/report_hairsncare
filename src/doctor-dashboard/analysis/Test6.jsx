import React, { useEffect, useState } from "react";
import BASE_URL from "../../Config";
import DoctorPrescribe from "./DoctorPrescribe";
import { toast } from "react-toastify";

export default function Test6({
  selectedOptions,
  setSelectedOptions,
  selectedTests,
  setSelectedTests,
}) {
  const [currentKits, setCurrentKits] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [newMedicine, setNewMedicine] = useState("");
  const [addedMedicines, setAddedMedicines] = useState([]);
  const [kitItems, setKitItems] = useState([]);
  const [followUpDate, setFollowUpDate] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  useEffect(() => {
    const defaultValues = {
      route: "Oral",
      subCategory: "Tablets",
      quantity: "1",
      dosage: "",
      frequency: "Daily at night",
      when: "",
      duration: "1 month",
      instructions: "",
    };

    const allMedicines = [...selectedMedicines, ...addedMedicines];
    let updatedPrescriptions = { ...prescriptions };

    for (let element of allMedicines) {
      updatedPrescriptions[element] =
        updatedPrescriptions[element] || defaultValues;
    }

    // Remove prescriptions for medicines no longer selected
    Object.keys(updatedPrescriptions).forEach((med) => {
      if (!allMedicines.includes(med)) {
        delete updatedPrescriptions[med];
      }
    });

    setPrescriptions(updatedPrescriptions);
  }, [selectedMedicines, addedMedicines]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/product`);
        const data = await response.json();
        setKitItems(data.message);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Initialize with existing medicines from selectedOptions
    if (selectedOptions.medicines?.[0]?.medicines) {
      const existingMedicines = Object.keys(
        selectedOptions.medicines[0].medicines
      );
      setSelectedMedicines((prev) => [
        ...new Set([...prev, ...existingMedicines]),
      ]);
      setPrescriptions((prev) => ({
        ...prev,
        ...selectedOptions.medicines[0].medicines,
      }));
    }
  }, [selectedOptions.medicines]);

  const handleCheckboxChange = (kit) => {
    const isSelected = currentKits.some((k) => k._id === kit._id);
    const medicines =
      Array.isArray(kit.kit) && kit.kit.length > 0 ? kit.kit : [kit.name];

    setCurrentKits((prev) =>
      isSelected ? prev.filter((k) => k._id !== kit._id) : [...prev, kit]
    );

    setSelectedMedicines((prev) =>
      isSelected
        ? prev.filter((m) => !medicines.includes(m))
        : [...new Set([...prev, ...medicines])]
    );
  };

  const handleRemoveMedicine = (med) => {
    setSelectedMedicines((prev) => prev.filter((item) => item !== med));
    setAddedMedicines((prev) => prev.filter((item) => item !== med));
    setCurrentKits((prev) =>
      prev.filter((kit) => {
        const medicines =
          Array.isArray(kit.kit) && kit.kit.length > 0 ? kit.kit : [kit.name];
        return !medicines.includes(med);
      })
    );
  };

  const handleAddMedicine = () => {
    if (newMedicine.trim()) {
      setAddedMedicines((prev) => [...prev, newMedicine.trim()]);
      setSelectedMedicines((prev) => [
        ...new Set([...prev, newMedicine.trim()]),
      ]);
      setNewMedicine("");
    }
  };

  const handleClearMedicines = () => {
    setSelectedMedicines([]);
    setAddedMedicines([]);
    setCurrentKits([]);
    setPrescriptions({});
    setSelectedOptions((prev) => ({
      ...prev,
      medicines: [],
    }));
    toast.info("All selected medicines cleared.");
  };

  const savePrescription = () => {
    const uniqueMedicines = [
      ...new Set([...selectedMedicines, ...addedMedicines]),
    ];
    const newMedicines = uniqueMedicines.reduce((acc, med) => {
      acc[med] = prescriptions[med] || {
        route: "Oral",
        subCategory: "Tablets",
        quantity: "1",
        dosage: "",
        frequency: "",
        when: "",
        duration: "",
        instructions: "",
      };
      return acc;
    }, {});

    setSelectedOptions((prev) => ({
      ...prev,
      medicines: [
        {
          kit:
            currentKits.map((kit) => kit.name).join(", ") || "Custom Medicines",
          medicines: newMedicines,
        },
      ],
      followUpDate,
    }));

    toast.success("Medicine instructions updated in prescription");
  };

  const handleMainCheckboxChange = (test) => {
    setSelectedTests((prev) => ({
      ...prev,
      mainTests: prev.mainTests.includes(test)
        ? prev.mainTests.filter((item) => item !== test)
        : [...prev.mainTests, test],
    }));
  };

  const handleSubCheckboxChange = (mainTest, subTest) => {
    setSelectedTests((prev) => {
      const subTests = prev.subTests[mainTest] || [];
      return {
        ...prev,
        subTests: {
          ...prev.subTests,
          [mainTest]: subTests.includes(subTest)
            ? subTests.filter((item) => item !== subTest)
            : [...subTests, subTest],
        },
      };
    });
  };

  const tests = [
    "CBC",
    "HBA1C",
    "LFT",
    "KFT",
    "Lipid Profile",
    "T3",
    "T4",
    "TSH",
    "S. Ferritin",
    "S. Iron",
    "S. Folate",
    "S. Vit B12",
    "S. Vit D3",
    "Blood Sugar",
  ];
  const bloodSugarSubTests = ["F", "PP", "Random"];

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
              width: "50%",
              border: "1px solid black",
              padding: "0.5rem",
            }}
          >
            <label
              style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
            >
              <input
                type="checkbox"
                checked={currentKits.some((k) => k._id === kit._id)}
                onChange={() => handleCheckboxChange(kit)}
              />
              <div>
                <h3>{kit.name}</h3>
                {Array.isArray(kit.kit) &&
                  kit.kit.length > 0 &&
                  kit.kit.map((item) => <p key={item}>{item}</p>)}
              </div>
            </label>
          </div>
        ))}
      </div>

      
      <h2 className="diag1">Tests</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#90ff90",
          padding: "1rem",
        }}
      >
        {tests.map((test) => (
          <label
            key={test}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="checkbox"
              checked={selectedTests.mainTests.includes(test)}
              onChange={() => handleMainCheckboxChange(test)}
            />
            {test}
          </label>
        ))}
      </div>

      {selectedTests.mainTests.includes("Blood Sugar") && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "#90ff90",
            padding: "1rem",
          }}
        >
          {bloodSugarSubTests.map((subTest) => (
            <label
              key={subTest}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={
                  selectedTests.subTests["Blood Sugar"]?.includes(subTest) ||
                  false
                }
                onChange={() => handleSubCheckboxChange("Blood Sugar", subTest)}
              />
              {subTest}
            </label>
          ))}
        </div>
      )}
      <div style={{ margin: "1rem 0" }}>
        <label style={{ marginRight: "1rem" }}>Add New Medicine:</label>
        <input
          type="text"
          value={newMedicine}
          onChange={(e) => setNewMedicine(e.target.value)}
          placeholder="Enter medicine name"
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button onClick={handleAddMedicine}>Add</button>
      </div>
      {(selectedMedicines.length > 0 || addedMedicines.length > 0) && (
        <div>
          <h2>Instructions</h2>
          <div>
            {[...new Set([...selectedMedicines, ...addedMedicines])].map(
              (med) => (
                <div>
                  <DoctorPrescribe
                    medicines={[med]}
                    prescriptions={prescriptions}
                    setPrescriptions={setPrescriptions}
                    handleRemoveMedicine={handleRemoveMedicine}
                  />
                </div>
              )
            )}
          </div>

          <div style={{ margin: "1rem 0" }}>
            <label style={{ marginRight: "1rem" }}>Follow-up Date:</label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              style={{ padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={handleClearMedicines}
              style={{ marginRight: "1rem" }}
              className="btn btn-danger"
            >
              Clear All Selected Medicines
            </button>

            <button
              className="btn btn-primary"
              onClick={() =>
                console.log("Preview:", { prescriptions, followUpDate })
              }
              style={{ marginRight: "1rem" }}
            >
              Preview Prescription
            </button>

            <button onClick={savePrescription} className="btn btn-success">
              Save Prescription
            </button>
          </div>
        </div>
      )}

      
    </>
  );
}
