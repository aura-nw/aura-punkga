import { RcFile } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import axios from "axios";
import { getUploadApi } from "../../swagger";

export const getBase64 = (img: RcFile) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });

export const uploadFileToStorage = async (
  file: UploadFile,
  onUploadProgress?: Function
) => {
  // return 'https://storage.googleapis.com/launchpad-assets-dev/20230301212747684-1b7c9afc-c810-4d40-b0da-b50a0873bab6.jpeg';
  const resData = await getUploadApi().apiUploadImagePost({
    fileName: file.name,
    type: file.type 
  });

  const putUrl = await resData.text();

  await axios.put(putUrl, file, {
    headers: {
      "Content-Type": file.type || "",
      // "Content-Type": "application/octet-stream",
    },
    onUploadProgress: (e: any) => {
      const percentCompleted = Math.round((e.loaded * 100) / e?.total || 1);
      onUploadProgress && onUploadProgress(e, percentCompleted);
    },
  });

  return putUrl.split('?')[0];
};
