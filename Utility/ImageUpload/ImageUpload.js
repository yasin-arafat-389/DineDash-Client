import axios from "axios";
import Swal from "sweetalert2";

export const imageUpload = async (
  image,
  setLoading,
  setOpen1,
  setOpenLoadingOverlay
) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios
    .post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    )
    .then()
    .catch(() => {
      setLoading(false);
      setOpen1 && setOpen1(false);
      setOpenLoadingOverlay && setOpenLoadingOverlay(false);
      Swal.fire({
        icon: "warning",
        text: "Please choose another image. This image might be corrupted!!",
      });

      return;
    });

  return data;
};
