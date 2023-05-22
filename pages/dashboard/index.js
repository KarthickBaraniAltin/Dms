import { Card } from "primereact/card";
import Header from "../../components/Header/Header";
import Flex from "../../components/Layout/Flex";

export default function Dashboard() {

    return (
        <>
            <div className="my-4 w-full h-screen" >
                <Card title={'Dashboard'} className="h-full" >
                    <Flex className={'h-full justify-content-center align-items-center'}>
                        <Header size={2} className={'text-500'}>Processing...</Header>
                    </Flex>
                </Card>
            </div>
        </>
    )
}