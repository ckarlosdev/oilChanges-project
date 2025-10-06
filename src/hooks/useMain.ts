import { Equipment } from "../types";
import { submitEquipmentURL } from "./urls";
import useHttpData from "./useHttpsData";

export default () => {
  const {
    data: submitAnswer,
    loading: submitLoading,
    error: submitError,
    putData: updateEquipmentData,
  } = useHttpData<Equipment>();

  const updateEquipment = (
    issue: Equipment
  ): Promise<Equipment | undefined> => {
    console.log("updating");
    return updateEquipmentData(submitEquipmentURL(), issue);
  };

  return {
    submitAnswer,
    submitLoading,
    submitError,
    updateEquipment,
  };
};
