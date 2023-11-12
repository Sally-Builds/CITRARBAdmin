import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import UploadsContext from "../../context/uploadsContext";

const MarketForm = () => {
  const categories = ["Gadget", "Clothing", "Food", "Others"];
  const { createMarketProduct } = useContext(UploadsContext);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Product Name is required";
    }
    if (!values.category) {
      errors.category = "Category is required";
    }
    if (!values.price) {
      errors.price = "Price is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (values.description !== "" && values.description.length < 25) {
      errors.description =
        "Description too short. must be greater that 25 characters";
    }
    if (values.images && values.images.length > 3) {
      errors.images = "Maximum of three images allowed";
    }

    return errors;
  };

  const handleImageChange = (event, setFieldValue) => {
    const selectedImages = Array.from(event.target.files);

    // Limit the number of selected images to 3
    if (selectedImages.length > 3) {
      alert("Maximum of three images allowed");
      return;
    }

    // Update Formik's form state with the selected images
    setFieldValue("images", selectedImages);
  };

  return (
    <div>
      <div className="text-center font-semibold text-xl p-2">
        <span>Add Market</span>
      </div>
      <hr className="pb-3" />

      <Formik
        initialValues={{
          name: "",
          category: "",
          price: "",
          images: [],
          description: "",
        }}
        onSubmit={async (values) => {
          await createMarketProduct(values);
        }}
        validate={validate}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Name"
              />
              <ErrorMessage
                name="name"
                render={(msg) => (
                  <div className="text-red-400 font-thin">{msg}</div>
                )}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <Field
                as="select"
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Category"
              >
                <option value="">Select a Category</option>
                {categories.map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                render={(msg) => <div className="text-red-400">{msg}</div>}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price (&#8358;)
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Price"
              />
              <ErrorMessage
                name="price"
                render={(msg) => <div className="text-red-400">{msg}</div>}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="images"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Images URL"
                multiple
                onChange={(event) => handleImageChange(event, setFieldValue)}
              />
              <ErrorMessage
                name="images"
                render={(msg) => <div className="text-red-400">{msg}</div>}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description..."
              />
              <ErrorMessage
                name="description"
                render={(msg) => (
                  <div className="text-red-400 text-sm">{msg}</div>
                )}
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

export default MarketForm;
