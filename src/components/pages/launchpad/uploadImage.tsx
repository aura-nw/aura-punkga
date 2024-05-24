import { Box } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import ic_gallery_add from "src/assets/images/icons/ic_gallery_add.svg";


type IUploadImage = {
    width?: string;
    height?: string;
    imgUrl?: string;
    id?: string;
    onChange?: (file: File | null) => void;
    disabled?: boolean;
};

const UploadImage = ({ imgUrl, id, onChange, width = "80px", height = "80px", disabled }: IUploadImage) => {
    const [imageUrl, setImageUrl] = useState<string | null>(imgUrl ?? null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        onChange?.(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl(null);
        }
    };

    useEffect(() => {
        setImageUrl(imgUrl ?? null);
    }, [imgUrl]);

    return (
        <>
            <label
                htmlFor={id}
                className={`w-[${width}]`}
            >
                <Box
                    border={`dashed 2px #414141`}
                    width={width}
                    height={height}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={1}
                    sx={{
                        "&:hover": {
                            cursor: disabled ? "normal" : "pointer",
                        },
                    }}
                >
                    {imageUrl ? (
                        <img
                            alt="img"
                            className="max-h-full max-w-full"
                            src={imageUrl}
                        />
                    ) : (
                        <Image src={ic_gallery_add} alt="ic_gallery_add" />
                    )}
                </Box>
            </label>
            <input
                id={id}
                accept="image/*"
                style={{ display: "none", width: "150px" }}
                type="file"
                onChange={handleFileChange}
                disabled={disabled}
            />
        </>
    );
};

export default UploadImage;
