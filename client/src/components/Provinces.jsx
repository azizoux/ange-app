import React, { useEffect, useState } from "react";

import { Button, Label, TextInput, Table, Alert } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function Provinces() {
  const [provinces, setProvinces] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState({
    id: 0,
    name: "",
    enrolled: 0,
    voter: 0,
    bulletin_null: 0,
    suffrage_exprimes: 0,
    taux: 0,
  });
  const fetchAllCandidates = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/candidate/all", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setCandidates(data.candidates);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProvince.name || !selectedProvince.enrolled) {
      return setMessage("Province name and enrolled cannot be null");
    }
    const formData = {
      id: selectedProvince._id,
      name: selectedProvince.name,
      enrolled: selectedProvince.enrolled,
      voter: selectedProvince.voter,
      null_bulletin: selectedProvince.null_bulletin,
    };
    const response = await fetch("http://localhost:3000/api/province/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      fetchAllProvinces();
      // console.log(data);
    }
  };
  const fetchAllProvinces = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/province/all", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setProvinces(data.provinces);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fillFormData = (el) => {
    setSelectedProvince(el);
  };
  const handleChange = (e) => {
    setSelectedProvince({
      ...selectedProvince,
      [e.target.id]: e.target.value.trim(),
    });
  };
  useEffect(() => {
    fetchAllProvinces();
  }, []);

  return (
    <div className="bg-slate-200 w-full h-screen">
      <div className="max-w-[90%] flex mx-auto mt-10 max-h-[38%] gap-2">
        <div className="flex-1 overflow-y-auto  rounded-md bg-slate-300 py-3 px-2">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Province</Table.HeadCell>
                <Table.HeadCell>Inscrits</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {provinces &&
                  provinces.map((item, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell
                        onClick={() => setCandidates(item.candidates)}
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                      >
                        {item.name}
                      </Table.Cell>
                      <Table.Cell>{item.enrolled}</Table.Cell>
                      <Table.Cell>
                        <Link onClick={() => fillFormData(item)}>
                          <FaEdit size={20} />
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="flex-1 bg-slate-300 overflow-y-auto">
          <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
            <span className="text-center font-bold">
              {selectedProvince
                ? selectedProvince.name
                : "Aucun province choisi"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label value="Nom du Province" />
                <TextInput
                  type="text"
                  placeholder="nom du province"
                  id="name"
                  onChange={handleChange}
                  value={selectedProvince?.name}
                />
              </div>
              <div>
                <Label value="Nombres des Incrits" />
                <TextInput
                  type="number"
                  id="enrolled"
                  onChange={handleChange}
                  value={selectedProvince?.enrolled}
                />
              </div>

              <div>
                <Label value="Nombre des votants" />
                <TextInput
                  type="number"
                  id="voter"
                  onChange={handleChange}
                  value={selectedProvince?.voter}
                />
              </div>
              <div>
                <Label value="Bulletin nulls" />
                <TextInput
                  type="number"
                  id="null_bulletin"
                  onChange={handleChange}
                  value={selectedProvince?.null_bulletin || 0}
                />
              </div>
              <div>
                <Label value="Suffrages exprimés" />
                <TextInput
                  type="number"
                  id="suffrage_exprimes"
                  value={
                    selectedProvince?.voter - selectedProvince?.null_bulletin ||
                    0
                  }
                  disabled={true}
                />
              </div>
              <div>
                <Label value="Taux part." />
                <TextInput
                  type="text"
                  id="taux"
                  onChange={handleChange}
                  value={
                    isNaN(
                      (
                        ((selectedProvince?.voter -
                          selectedProvince?.null_bulletin) /
                          selectedProvince?.enrolled) *
                        100
                      ).toFixed(2)
                    )
                      ? "0%"
                      : (
                          ((selectedProvince?.voter -
                            selectedProvince?.null_bulletin) /
                            selectedProvince?.enrolled) *
                          100
                        )
                          .toFixed(2)
                          .toString() + "%"
                  }
                  disabled={true}
                />
              </div>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={false}
            >
              Enregister
            </Button>
            {message && (
              <Alert className="mt-5" color={"success"}>
                {message}
              </Alert>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-[90%] flex mx-auto mt-10 max-h-[38%] gap-2">
        <div className="flex-1 overflow-y-auto  rounded-md bg-slate-300 py-3 px-2">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Nom du Candidat</Table.HeadCell>
                <Table.HeadCell>Voix</Table.HeadCell>
                <Table.HeadCell>%</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {candidates &&
                  candidates.map((item, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.candidate}
                      </Table.Cell>
                      <Table.Cell>{item.voices}</Table.Cell>
                      <Table.Cell>10%</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="flex-1 bg-slate-300 overflow-y-auto">
          <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
            <span className="text-center font-bold">
              {selectedProvince
                ? selectedProvince.name
                : "Aucun province choisi"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label value="Nom du Province" />
                <TextInput
                  type="text"
                  placeholder="nom du province"
                  id="name"
                  onChange={handleChange}
                  value={selectedProvince?.name}
                />
              </div>
              <div>
                <Label value="Nombres des Incrits" />
                <TextInput
                  type="number"
                  id="enrolled"
                  onChange={handleChange}
                  value={selectedProvince?.enrolled}
                />
              </div>

              <div>
                <Label value="Nombre des votants" />
                <TextInput
                  type="number"
                  id="voter"
                  onChange={handleChange}
                  value={selectedProvince?.voter}
                />
              </div>
              <div>
                <Label value="Bulletin nulls" />
                <TextInput
                  type="number"
                  id="null_bulletin"
                  onChange={handleChange}
                  value={selectedProvince?.null_bulletin || 0}
                />
              </div>
              <div>
                <Label value="Suffrages exprimés" />
                <TextInput
                  type="number"
                  id="suffrage_exprimes"
                  value={
                    selectedProvince?.voter - selectedProvince?.null_bulletin ||
                    0
                  }
                  disabled={true}
                />
              </div>
              <div>
                <Label value="Taux part." />
                <TextInput
                  type="text"
                  id="taux"
                  onChange={handleChange}
                  value={
                    isNaN(
                      (
                        ((selectedProvince?.voter -
                          selectedProvince?.null_bulletin) /
                          selectedProvince?.enrolled) *
                        100
                      ).toFixed(2)
                    )
                      ? "0%"
                      : (
                          ((selectedProvince?.voter -
                            selectedProvince?.null_bulletin) /
                            selectedProvince?.enrolled) *
                          100
                        )
                          .toFixed(2)
                          .toString() + "%"
                  }
                  disabled={true}
                />
              </div>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={false}
            >
              Enregister
            </Button>
            {message && (
              <Alert className="mt-5" color={"success"}>
                {message}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Provinces;
