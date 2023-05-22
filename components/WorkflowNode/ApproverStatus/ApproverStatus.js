import Flex from '../../Layout/Flex'
import Header from '../../Header/Header'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/Divider'
import { Timeline } from 'primereact/timeline'
import { Badge } from 'primereact/badge'

export const ApproverStatus = ({ formId }) => {


    const events = [
        { status: 'Submit', date: '15/10/2020 10:30', icon: 'pi pi-user', color: '#607D8B', name: 'Karthick' },
        { status: 'Approver-1', date: '15/10/2020 14:00', icon: 'pi pi-user', color: '#607D8B', name: 'Chandra' },
        { status: 'Approver-2', date: '15/10/2020 16:15', icon: 'pi pi-user', color: '#FF9800', name: 'Guna' },
        { status: 'Approved', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', name: 'Peter' }
    ]

    const customizedMarker = (item) => {
        return (
            <span role={'button'} title={item.name} className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        )
    }




    return (
        <>
            <Flex className={'gap-1 justify-content-between p-1'} >
                <Flex className={'gap-5'} >
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Form ID:
                        </Header>
                        <strong>{formId}</strong>
                    </Flex>
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Form Type:
                        </Header>
                        <strong>123</strong>
                    </Flex>
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Form Title:
                        </Header>
                        <strong>Job Request form</strong>
                    </Flex>
                    <Flex direction={'column'} >
                        <Header size={4}>
                            Current Status
                        </Header>
                        <strong>Approver-2</strong>
                    </Flex>
                </Flex>
                <Flex className={'align-items-center'} >
                    <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
                </Flex>
            </Flex>
            <Divider />
            <Flex direction={'column'} className={'mb-5'} >
                <Flex className={'justify-content-center px-5'}>
                    <div className='w-12'>
                        <Timeline value={events} layout={'horizontal'} marker={customizedMarker} content={(item, index) => (<Badge value={`${item.status}`} size="small" severity={`${index === events.length - 1 ? 'success' : 'warning'}`} />)} />
                    </div>
                </Flex>
            </Flex>
            <Divider />
        </>
    )
}