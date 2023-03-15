import Image from 'next/image'
import React from 'react'

export default function CreateHeader({metadata, openDialog}) {
  const { name, className, guid, id, page } = metadata
  const [url, setUrl] = useState({})

  const handleHeaderImage = (event) => {
    if (event.target.dataset) {
        const image = new Image()
        image.src = URL.createObjectURL(event.target.files[0])
        image.onload = () => {
            setUrl({[event.target.dataset.name]: { file: event.target.files[0], dimensions: {width: image.naturalWidth, height: image.naturalHeight}, url: URL.createObjectURL(event.target.files[0]) }})
        }
    }
  }

  return (
    <div className='flex flex-column'>
        <div>
            <div>
                <div style={{'border': '1px #004990 solid', 'color': 'black', 'marginBottom': '0.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0 2rem', padding: '1rem', borderRadius: '1rem'}}>
                    {url?.url ? 
                    <Image src={url.url} alt="Image" width='100' height='100' /> 
                    : 
                    <div style={{width: '100%', height: 'auto'}}></div>
                    }
                    <label style={{alignSelf: 'center', textAlign: 'center', fontWeight: '700'}}>{label}</label>
                    <div style={{width: '100%', height: 'auto'}}></div>
                </div>
            </div>
            <input type='file' onChange={handleHeaderImage} accept="image/png, image/jpeg" data-name={componentData?.name} />
        </div>
    </div>
  )
}
