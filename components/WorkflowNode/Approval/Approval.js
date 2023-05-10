import Flex from '../../Layout/Flex'
import Header from '../../Header/Header'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/Divider'

export const Approval = () => {



    const ApprovalLevels = ({ status, approver }) => {
        return (
            <>
                <Flex direction={'column'} >
                    <div className={'border-1 border-round w-100 h-2rem p-1 px-3 '} >
                        {status}
                    </div>
                    <Header size={4} >{approver}</Header>
                </Flex>
            </>
        )
    }

    return (
        <>
            <Flex className={'gap-1 justify-content-between'} >
                <Flex className={'gap-5'} >
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Form ID:
                        </Header>
                        123
                    </Flex>
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Form Type:
                        </Header>
                        123
                    </Flex>
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Form Title:
                        </Header>
                        123
                    </Flex>
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Current Status
                        </Header>
                        123
                    </Flex>
                </Flex>
                <Flex className={'align-items-center'} >
                    <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
                </Flex>
            </Flex>
            <Divider />
            <Flex className={'gap-2'} >
                <ApprovalLevels status={'Submited'} approver={'Peter'} />
                {'>>>'}
                <ApprovalLevels status={'Review in'} approver={'Chandra'} />
                {'>>>'}
                <ApprovalLevels status={'Review in'} approver={'Guna'} />
                {'>>>'}
                <ApprovalLevels status={'Final Approval'} approver={'Guna'} />
            </Flex>
        </>
    )
}