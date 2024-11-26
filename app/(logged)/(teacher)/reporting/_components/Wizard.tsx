import {useCallback, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Gender from '@/app/(logged)/(teacher)/reporting/_components/Tabs/Gender';
import SelectTab from '@/app/(logged)/(teacher)/reporting/_components/Tabs/SelectTab';
import ReportingData, {ReportingDataType} from '@/utils/data/Reporting/ReportingData';
import {useReporting} from '@/hooks/ReportingProvider';
import {setNotification} from '@/lib/Notification/ClientNotification';
import createReview from '@/utils/functions/CreateReporting';

const steps: { title: string; id: keyof ReportingDataType; required: boolean }[] = [
    { title: 'Gender', id: 'gender', required: true },
    { title: 'Introduction', id: 'introduction', required: true },
    { title: 'How Works', id: 'how_works', required: true },
    { title: 'Special Skills', id: 'special_skills', required: false },
    { title: 'Point to Improve', id: 'point_to_improve', required: false },
    { title: 'Closure', id: 'closure', required: true}];

export default function Wizard({id, name}: { id: number; name: string }) {
    const [activeStep, setActiveStep] = useState(0);
    const reporting = useReporting();

    const [formData, setFormData] = useState<ReportingDataType>({
        gender: null, introduction: '', how_works: '', special_skills: '', point_to_improve: '', closure: '',
    });

    const handleFormChange = useCallback((key: keyof ReportingDataType, value: string) => {
        setFormData((prevState) => ({...prevState, [key]: value}));
    }, []);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleSubmit();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const finalText = useMemo(() => {
        const text = [formData.introduction || '', formData.how_works || '', formData.special_skills || '', formData.point_to_improve || '', formData.closure || '',].join(' ');
        return createReview(name.split(' ')[0], formData.gender, text);
    }, [name, formData]);

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        reporting.addNote(id, finalText);
        reporting
            .submitNote(id, finalText)
            .then(() => {
                setNotification('Evaluation saved');
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            })
            .catch((error) => {
                setNotification('Failed to save the evaluation');
                console.error(error);
            });
    };

    const currentStep = steps[activeStep];
    const isNextDisabled = activeStep >= steps.length || currentStep?.required && !formData[currentStep.id];

    return (
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step) => (<Step key={step.title}>
                        <StepLabel>{step.title}</StepLabel>
                    </Step>))}
            </Stepper>
            <Box className="flex flex-col justify-between h-full">
                {activeStep >= steps.length ?
                    <p className={"mt-10 ml-12"}>Thanks for sending this review! 😄</p> :
                    (currentStep.id === 'gender' ? (
                        <Gender value={formData.gender} onChange={(value) => handleFormChange('gender', value)}/>) : (
                        <SelectTab
                            values={ReportingData.get(currentStep.id)}
                            value={formData[currentStep.id]}
                            title={currentStep.title}
                            onChange={(value) => handleFormChange(currentStep.id, value)}
                            required={currentStep.required}
                            finalText={finalText}
                        />))}
                {activeStep < steps.length &&
                    (<Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                            <Button disabled={isNextDisabled} onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                            </Button>
                    </Box>)}
            </Box>
        </Box>
    );
}
