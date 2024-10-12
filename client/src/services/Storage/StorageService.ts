import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  getStorage
} from "firebase/storage"

const storage = getStorage()

// https://stackoverflow.com/a/19842865
const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const StorageService = {
  uploadEventImage: async (file: File) => {
    if (file === null) {
      return
    }

    try {
      const imageRef = storageRef(storage, `event-images/${uid()}`)
      const snapshot = await uploadBytes(imageRef, file)
      const url = getDownloadURL(snapshot.ref)

      return url
    } catch (e) {
      console.error("failed to upload image", e)
      return undefined
    }
  }
}

export default StorageService
