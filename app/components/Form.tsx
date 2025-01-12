import { useForm } from "react-hook-form";
import { FormData, UserSchema, ValidFieldNames } from "./types";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the Zod resolver
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/form", data); // Make a POST request
      const { errors: serverErrors = {} } = response.data; // Destructure the 'errors' property from the response

      // Define a mapping between server-side field names and client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        FirstName: "FirstName",
        lastName: "lastName",
        email: "email",
        githubUrl: "githubUrl",
        yearsOfExperience: "yearsOfExperience",
        password: "password",
        confirmPassword: "confirmPassword",
      };

      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => serverErrors[field]
      );

      // If a field with an error is found, update the form error state using setError
      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: serverErrors[fieldWithError],
        });
      }
    } catch (error) {
      console.error("Submitting form failed!", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const fields: { label: string; name: ValidFieldNames; type: string; placeholder: string }[] = [
    { label: "First Name", name: "FirstName", type: "text", placeholder: "Your First Name" },
    { label: "Last Name", name: "lastName", type: "text", placeholder: "Your Last Name" },
    { label: "E-mail", name: "email", type: "email", placeholder: "Email" },
    { label: "GitHub URL", name: "githubUrl", type: "text", placeholder: "https://github.com/YourIdName" },
    { label: "Years of Experience", name: "yearsOfExperience", type: "number", placeholder: "Years of Experience (1 - 10)" },
    { label: "Password", name: "password", type: "password", placeholder: "Password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-full max-w-lg p-8 rounded-lg shadow-md bg-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Zod & React-Hook-Form</h1>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
            >
              <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
              <FormField
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type={field.type}
                placeholder={field.placeholder}
                name={field.name} // Correctly typed as ValidFieldNames
                register={register}
                error={errors[field.name]} // Access error for the specific field
                valueAsNumber={field.type === "number"}
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          type="submit"
          className="w-full mt-6 p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

export default Form;
