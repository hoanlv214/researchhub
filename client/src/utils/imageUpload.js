export const checkImage = (file) => {
    let err = ""
    if (!file) return err = "File does not exist."

    if (file.size > 1024 * 1024 * 5) // 5mb
        err = "The largest image size is 5mb."

    if (file.type !== "image/jpeg" && file.type !== "image/png")
        err = "Image format is incorrect."

    return err;
}

export const checkPDF = (file) => {
    let err = ""
    if (!file) return err = "File does not exits"

    if (file.size > 1024 * 1024 * 10) //10mb
        err = "The largest PDF size is 10mb."

    if (file.type !== "application/pdf")
        err = "PDF format is incorrect."

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData()

        if (item.camera) {
            formData.append("file", item.camera)
        } else {
            formData.append("file", item)
        }

        formData.append("upload_preset", "hoanlv")
        formData.append("cloud_name", "diauabgmc")

        const res = await fetch("https://api.cloudinary.com/v1_1/diauabgmc/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imgArr;
}
