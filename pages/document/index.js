import { Card } from "primereact/card"
import { Button } from "primereact/button"
import Flex from "../../components/Layout/Flex"
import Header from "../../components/Header/Header"
import TextInput from "../../components/Input/TextInput"
import { useRouter } from "next/router"

export default function Home() {

    const router = useRouter()


    return (
        <>
            <Flex direction={'column'} className={'my-4 h-full w-full bg-white justify-content-start border-round'} >
                <Flex className={'px-3 py-2'} >
                    <Header size={2}>Document</Header>
                </Flex>
                <Flex direction={'column'} className={'justify-content-center align-items-center h-full'} >
                    <Flex direction={'column'} className={'justify-content-center align-items-center gap-3 w-7'} >
                        <Header size={2} className={'text-left text-primary'} >Would You Like To...</Header>
                        <Button className={'btn btn-flex border-round-lg border-1 p-3 w-10'} >
                            <Flex direction={'column'} className={'justify-content-start'} >
                                <Header size={2} >
                                    Upload Forms Of The Same Type
                                </Header>
                                {/* <Flex direction="column"  >
                                <TextInput label={'Document Type'} />
                                <TextInput label={'Document '} />
                            </Flex> */}
                            </Flex>
                        </Button>
                        <Button className={'btn btn-flex border-round-lg border-1 p-3 w-10'} onClick={() => {
                            router.push('document/upload')
                        }} >
                            <Flex direction={'column'} className={'align-items-start'} >
                                <Header size={2} >
                                    Upload A Batch
                                </Header>
                                <div>
                                    <strong>Upload Or Scan documents and process them one by one</strong>
                                </div>
                            </Flex>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

        </>
    )
}