import React, { useRef , useState } from 'react'
import { LuUser,LuUpload,LuTrash } from 'react-icons/lu'

interface photoProps{
    image: string,
    setImage: (image: string | null ) => void
}

const ProfilePhotoSelecter: React.FC<photoProps> = ({image,setImage}) => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {}
        const file = event.target.files ? event.target.files[0] : null
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
       if (inputRef.current) {
         inputRef.current.click();
       }
    }

  return (
    <div>ProfilePhotoSelecter</div>
  )
}

export default ProfilePhotoSelecter