'use client'

import UploadThingMultipleUploader from '@/components/uploadthing/uploadthingMultipleUploader'
import { UploadFileResponse } from '@/lib/uploadthing';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { UploadThingError } from 'uploadthing/server';


type Props = {
    SetImages: (images: string[]) => void
    images: string[]
}

const ImageUploaderComponent = (props: Props) => {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    console.log(props.images)
    const onUploadComplete = (res: UploadFileResponse<{ uploadedBy: string }>[]) => {
        const images = res.map(res => res.url)
        props.SetImages([...props.images, ...images])
        toast.success('upload complete')
        setIsButtonClicked(false)
    };
    const onUploadError = (error: UploadThingError) => {
        console.log(error)
        toast.error(error.message)
        setIsButtonClicked(false)
    };
    const onUploadBegin = (fileName: string) => {
        setIsButtonClicked(true)
    };
    return (
        <div className=''>
            {/* <label className='block text-gray-700'>Upload Image</label> */}
            <UploadThingMultipleUploader
                // buttonClickedState={isButtonClicked}
                imageUploaderApi='imageUploader'
                onUploadBegin={onUploadBegin}
                onUploadComplete={onUploadComplete}
                onUploadError={onUploadError}
            />
        </div>
    )

}

export default ImageUploaderComponent