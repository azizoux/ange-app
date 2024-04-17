import React, { useEffect, useState } from "react";

import { Button, Label, TextInput, Table, Alert } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectCandidateName, setSelectedCandidate] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [candidatesCreatedAt, setCandidatesCreatedAt] = useState("");
  const [candidatesUpdatedAt, setCandidatesUpdatedAt] = useState("");
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
  useEffect(() => {
    fetchAllCandidates();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/candidate/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedCandidateId,
        newFullname: selectCandidateName,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("Le candidat est bien modifie");
      fetchAllCandidates();
      console.log(data);
    }
  };
  const handleCandidateInfo = (obj) => {
    setSelectedCandidate(obj.fullname);
    setSelectedCandidateId(obj._id);
  };

  return (
    <div className="bg-slate-200 w-full">
      <div className="max-w-[90%] flex mx-auto mt-10 max-h-[70%] gap-2">
        <div className="flex-1 overflow-y-auto  rounded-md bg-slate-300 py-3 px-2">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Nom et Prenom</Table.HeadCell>
                <Table.HeadCell>Rang</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {candidates &&
                  candidates.map((item, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.fullname}
                      </Table.Cell>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        <Link onClick={() => handleCandidateInfo(item)}>
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
          <form
            className="flex flex-col gap-4 p-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <Label value="Nom et Prenom du Candidat à modifier" />
              <TextInput
                type="text"
                placeholder="nom et prenom du candidat"
                id="fullname"
                onChange={(e) => setSelectedCandidate(e.target.value)}
                value={selectCandidateName}
              />
              <TextInput type="hidden" value="660ea9e98afcbb5c404a840a" />
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

export default Candidates;
