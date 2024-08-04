// app/visitor/page.tsx
import VisitorForm from './form/VisitorForm'

const VisitorPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Visitor Registration Form</h1>
            <VisitorForm />
        </div>
    )
}

export default VisitorPage
