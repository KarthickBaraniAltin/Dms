import Flex from '../../Layout/Flex'
import Header from '../../Header/Header'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/Divider'
import { Timeline } from 'primereact/timeline'
import { Badge } from 'primereact/badge'
import { useEffect, useState, useRef } from 'react'
import { axiosGet } from '../../../helpers/Axios'
import Modal from '../../Modal/Modal'
import ApprovalForm from '../Form/ApprovalForm'
import { Toast } from 'primereact/toast'

export const ApproverStatus = ({ formId, metaDataId, children }) => {

    const [loading, setLoading] = useState(true)
    const [formStatus, setFormStatus] = useState({})
    const [isVisible, setIsVisible] = useState(false)
    const [type, setType] = useState('APPROVING')
    const toast = useRef(null)

    const showSuccess = () => {
        toast.current.show({ severity: `${type === 'APPROVING' ? 'success' : 'warn'}`, summary: `${type === 'APPROVING' ? 'Approved' : 'Rejected'}`, life: 3000 })
    }

    const onHide = () => {
        setIsVisible(prev => !prev)
    }



    useEffect(() => {
        axiosGet(`FormStatus/${metaDataId}`)
            .then(res => {
                setFormStatus(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [metaDataId])


    const events = [
        { status: 'Submit', date: '15/10/2020 10:30', icon: 'pi pi-user', color: '#607D8B', name: 'Karthick' },
        { status: 'Approver-1', date: '15/10/2020 14:00', icon: 'pi pi-user', color: '#607D8B', name: 'Chandra' },
        { status: 'Approver-2', date: '15/10/2020 16:15', icon: 'pi pi-user', color: '#FF9800', name: 'Guna' },
        { status: 'Approved', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', name: 'Peter' }
    ]

    const customizedMarker = (item) => {
        return (
            <span role={'button'} title={item.name} className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1 p-2" style={{ backgroundColor: item.color }}>
                <span className={item.icon}></span>
            </span>
        )
    }



    return (
        <>
            {
                loading ?
                    <p>loading...</p>
                    :
                    <>
                        <Flex className={'gap-1 justify-content-between p-1'} >
                            <Flex className={'gap-5'} >
                                <Flex direction={'column'} >
                                    <Header size={4}>
                                        Form ID:
                                    </Header>
                                    <strong>{formStatus.formDefinitionId}</strong>
                                </Flex>
                                {/* 
                                <Flex direction={'column'} >
                                    <Header size={4}>
                                        Form Type:
                                    </Header>
                                    <strong>123</strong>
                                </Flex> */}

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
                                    <strong>{`${formStatus.currentStatusText} [${formStatus.currentApprover}]`} </strong>
                                </Flex>
                            </Flex>
                            <Flex className={'align-items-center'} >
                                <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
                            </Flex>
                        </Flex>
                        <Divider />
                        <Flex direction={'column'} className={'mb-5'} >
                            <Flex className={'justify-content-send px-5 w-10'}>
                                <div className='w-10'>
                                    {/* <Timeline value={events} layout={'horizontal'} marker={customizedMarker} content={(item, index) => (<Badge className='text-white' value={`${item.status}`} size="small" severity={`${index === events.length - 1 ? 'success' : 'warning'}`} />)} /> */}
                                    <Timeline value={events} layout={'horizontal'} marker={customizedMarker} content={(item, index) => (<Badge className='text-white' value={`${item.status}`} size="small" severity={`${index === events.length - 1 ? 'success' : 'warning'}`} />)} />
                                </div>
                            </Flex>
                        </Flex>
                        <Divider />
                        {children}
                        <Flex className={'justify-content-end my-5'} >
                            {
                                formStatus.currentStatusText === 'InReview' || formStatus.currentStatusText === 'Processing' ?
                                    <Flex className={'gap-3'}>
                                        <Button severity={'danger'} label={'Reject'} rounded onClick={() => {
                                            setType('REJECTING')
                                            onHide()
                                        }} />
                                        <Button severity={'success'} label={'Approve'} rounded onClick={() => {
                                            setType('APPROVING')
                                            onHide()
                                        }} />
                                    </Flex>
                                    :
                                    null
                            }
                        </Flex>
                        <Modal header={'Approver'} visible={isVisible} onHide={onHide} style={{ width: '50wv' }}  >
                            <ApprovalForm type={type} formId={formStatus.formDefinitionId} metaDataId={metaDataId} onHide={onHide} showSuccess={showSuccess} />
                        </Modal>
                        <Toast ref={toast} />
                    </>
            }
        </>
    )
}