import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function updateCertification(req = request, res = response) {
  const certificationID = parseInt(req.params.id);
  const userId = req.userId;
  const { name, issued_by, year, id_credential_url, description } = req.body;
  
  try {
    const profileID = await getProfileIdByUserId(userId);

    const existingCertification = await db.certifications.findUnique({
      where: {
        id: certificationID,
        profileId: profileID,
      },
    });

    if (!existingCertification) {
      return res.status(404).json({
        status: "error",
        message: "Certification not found",
      });
    }

    const updatedCertification = await db.certifications.update({
      where: {
        id: certificationID,
      },
      data: {
        name: name,
        issued_by: issued_by,
        year: year,
        id_credential_url: id_credential_url,
        description: description,
      },
    });

    res.status(200).json({
      status: "success",
      data: updatedCertification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { updateCertification };