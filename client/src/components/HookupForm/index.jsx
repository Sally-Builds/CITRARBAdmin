import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import EventsContext from "../../context/eventsContext";

const HookupForm = () => {
  const categories = ["male", "female"];
  const { createHookup } = useContext(EventsContext);

  const validate = (values) => {
    const errors = {};

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    return errors;
  };

  return (
    <div>
      <div className="text-center font-semibold text-xl p-2">
        <span>Create Contest</span>
      </div>
      <hr className="pb-3" />

      <Formik
        initialValues={{
          gender: "",
        }}
        onSubmit={async (values) => {
          await createHookup(values);
        }}
        validate={validate}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="gender"
              >
                <option value="">Select a Gender</option>
                {categories.map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </Field>
              <ErrorMessage
                name="gender"
                render={(msg) => <div className="text-red-400">{msg}</div>}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HookupForm;
