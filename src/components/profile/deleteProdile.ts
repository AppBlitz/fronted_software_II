import { api } from "../../api/referencie";

function deleteProfile(id: string) {
  api({
    method: "DELETE",
    url: `/customers/delete/${id}`,
  })
    .then((answer) => {
      alert(answer);
    })
    .catch((error) => {
      console.error(error);
    }).finally(() => {
      console.log("mensaje");
    })
};
export { deleteProfile };
