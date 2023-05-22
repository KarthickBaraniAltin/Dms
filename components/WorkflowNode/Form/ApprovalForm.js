import TextInput from '../../Input/TextInput'
import Flex from '../../Layout/Flex'
import Header from '../../Header/Header'
import { Button } from 'primereact/button'
import TextareaInput from '../../Input/TextareaInput'
import { Toast } from 'primereact/toast';
import { useRef } from 'react'


function ApprovalForm({ formName, onHide, showSuccess }) {



    return (
        <>
            <form >
                <div className={'flex flex-column gap-2'} ></div>
                <Header size={1} ><small> You are {formName} this form</small></Header>
                <Header size={3} >Review :</Header>
                <TextareaInput label={'Reason unable to use Clearinghouse'} autoResize cols={75} />
                <TextareaInput label={'Additional notes'} autoResize cols={75} />
                {/* <TextInput label={'Reason unable to use Clearinghouse'} />
                <TextInput label={'Additional notes'} /> */}
                <div className="flex justify-content-around" >
                    <div className="flex flex-column" >
                        <label>Received by:</label>
                        <Header size={5} >Guna</Header>
                        <Header size={5} >Peter</Header>
                        <Header size={5} >chandra</Header>
                    </div>
                    <div className="flex flex-column" >
                        <label>Date Received:</label>
                        <Header size={4} >3/16/23</Header>
                    </div>
                </div>
                <div className="flex justify-content-around" >
                    <div className="flex flex-column" >
                        <label>Date send:</label>
                        <Header size={5} >TBD</Header>
                    </div>
                    <div className="flex flex-column" >
                        <label>By:</label>
                        <Header size={4} >3/16/23</Header>
                    </div>
                </div>
                <div className="flex justify-content-around" >
                    <div className="flex flex-column"  >
                        <TextInput label={'Signature'} style={{ fontFamily: ['Zeyada', 'cursive'] }} value={'Guna'} />
                    </div>
                    <div className="flex flex-column" >
                        {null}
                    </div>
                </div>
                <Flex className={'justify-content-around'} >
                    <Button type='button' label={'Cancel'} onClick={() => {
                        onHide()
                    }} ></Button>
                    <Button type='button' label={'Submit'} onClick={() => {
                        showSuccess()
                        onHide()
                    }} ></Button>
                </Flex>

            </form>

        </>
    )
}

export default ApprovalForm