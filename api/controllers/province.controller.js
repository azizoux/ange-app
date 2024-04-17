import Province from "../models/province.model.js";
import Candidate from "../models/candidate.model.js";
import Score from "../models/score.model.js";
import { errorHandler } from "../utils/error.js";

export const addProvince = async (req, res, next) => {
  const { id, name, enrolled, voter, null_bulletin } = req.body;
  if (!name || !enrolled || name === "" || enrolled === "") {
    next(
      errorHandler(400, "the field province name and enrolled are required!")
    );
  }

  try {
    const province = await Province.findById(id);
    if (!province) {
      const newProvince = new Province({
        name,
        enrolled,
        voter,
        null_bulletin,
      });
      const allCandidate = await Candidate.find();
      if (allCandidate) {
        allCandidate.forEach(async (candidat) => {
          newProvince.candidates.push({
            candidate: candidat,
            voices: 0,
          });
        });
      }
      const createdProvince = await newProvince.save();
      console.log("createdProvince: ", createdProvince);
      res.status(200).json({
        message: "Province created Successfuly",
        province: createdProvince,
      });
    } else {
      (province.name = name), (province.enrolled = enrolled);
      province.voter = voter;
      province.null_bulletin = null_bulletin;
      await province.save();
      res.status(200).json({
        message: "Province updated Successfuly",
        province,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllProvines = async (req, res, next) => {
  try {
    const provinces = await Province.find().populate(
      "candidates.candidate",
      "fullname"
    );
    if (!provinces) {
      return next(errorHandler(404, "No provinces found"));
    }
    const listProvinces = [];
    provinces.forEach((prov) => {
      listProvinces.push({ ...prov, taux: prov.getTauxParticipation() });
    });
    console.log(provinces);
    return res.status(200).json({ provinces });
  } catch (error) {
    next(error);
  }
};
