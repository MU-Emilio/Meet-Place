import React, { useState } from "react";
import { User, EventForm } from "../lib/types";
import AddGuestButton from "./AddGuestButton";
import DeleteGuestButton from "./DeleteGuestButton";
import FormGuestsList from "./FormGuestsList";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  friends: User[];
  data: EventForm;
  handleNextField: (newData: EventForm, final: boolean) => void;
  handlePrevField: (newData: EventForm) => void;
}

const EventGuestsField = ({
  friends,
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  const [addedGuests, setAddedGuests] = useState<User[]>([]);
  const [notAddedGuests, setNotAddedGuests] = useState<User[]>(friends);

  const handleAddGuest = (user: User) => {
    setAddedGuests((prev) => [...prev, user]);
    setNotAddedGuests((prev) => [...prev.filter((item) => item != user)]);
    data.guests = [...data.guests, user];
    console.log(data);
  };

  const handleDeleteGuest = (user: User) => {
    setAddedGuests((prev) => [...prev.filter((item) => item != user)]);
    setNotAddedGuests((prev) => [...prev, user]);
    data.guests = [...data.guests.filter((item) => item != user)];
    console.log(data);
  };

  return (
    <div className="block">
      <div className="flex justify-around">
        <div>
          <p>Not Added</p>
          <FormGuestsList
            users={notAddedGuests}
            ButtonComponent={(userInfo: User) => (
              <AddGuestButton
                userCard={userInfo}
                handleAddGuest={handleAddGuest}
              />
            )}
          />
        </div>

        <div>
          <p>Added</p>
          <FormGuestsList
            users={addedGuests}
            ButtonComponent={(userInfo: User) => (
              <DeleteGuestButton
                userCard={userInfo}
                handleDeleteButton={handleDeleteGuest}
              />
            )}
          />
        </div>
      </div>

      {/* <div className="flex w-fit gap-6 m-auto">
        <button
          type="button"
          className="mt-4"
          onClick={() => handlePrevField(values)}
        >
          Back
        </button>
        <button type="submit" className="mt-4">
          Next
        </button>
      </div> */}

      {/* <div className=" w-fit mt-10 mx-auto">
        <Formik
          initialValues={data}
          onSubmit={(values) => {
            handleNextField(values, false);
          }}
        >
          {({ values }) => (
            <Form className="block">
              <div className="flex gap-10">
                <div>
                  <label
                    className="block text-4xl mx-auto"
                    htmlFor="description"
                  >
                    Where?
                  </label>
                  <p>{"If it's a remote event, don't type a location"}</p>
                  <Field
                    className="block w-96 h-10 border-2 m-auto mt-4"
                    id="location"
                    name="location"
                    placeholder="Where are you going?"
                    autoComplete="off"
                  />
                </div>
              </div>

              <ErrorMessage name="date" />

              <div className="flex w-fit gap-6 m-auto">
                <button
                  type="button"
                  className="mt-4"
                  onClick={() => handlePrevField(values)}
                >
                  Back
                </button>
                <button type="submit" className="mt-4">
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div> */}
    </div>
  );
};

export default EventGuestsField;
