import React from "react";
import { Button } from "../Button/Button";
import { EditMedicationItemProps } from "./EditMedicationItem.props";
import styles from "./EditMedicationItem.module.css";
import { Divider } from "../Divider/Divider";
import axios from "axios";
import cn from "classnames";
import WithLabel from "../WithLabel/WithLabel";
import Tag from "../Tag/Tag";
import { Input } from "../Input/Input";
import * as yup from "yup";
import { ValidationError } from "yup";
import { PATCH_ITEM_URL, POST_ITEM_URL } from "../../constants/url";

const schema = yup.object().shape({
  name: yup.string().required("Write medication name."),
  description: yup.string().required("Write medication description."),
  destinationCount: yup.number().required().positive().integer(),
});

export const EditMedicationItem = ({
  item,
  mode,
  setModalOpen,
}: EditMedicationItemProps): JSX.Element => {
  const [name, setName] = React.useState<string>(item.name);
  const [nameError, setNameError] = React.useState<string>("");

  const [description, setDescription] = React.useState<string>(
    item.description
  );
  const [descriptionError, setDescriptionError] = React.useState<string>("");

  const [destinationCount, setDestinationCount] = React.useState<number>(
    item.destinationCount
  );
  const [destinationCountError, setDestinationCountError] =
    React.useState<string>("");

  const [count, setCount] = React.useState<number>(item.count);

  const resetErrors = () => {
    setNameError("");
    setDescriptionError("");
    setDestinationCountError("");
  };

  const isValidForm = async () => {
    resetErrors();
    let isValid = true;

    try {
      await schema.validate({
        name,
        description,
        destinationCount,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        isValid = false;
        console.log(error.path);
        switch (error.path) {
          case "name":
            setNameError(error.errors[0]);
            break;
          case "description":
            setDescriptionError(error.errors[0]);
            break;
          case "destinationCount":
            setDestinationCountError(error.errors[0]);
            break;
        }
      }
    }

    return isValid;
  };

  const postItem = async () => {
    const payload = {
      name,
      description,
      destinationCount,
      count,
    };

    try {
      const result = await axios.post(POST_ITEM_URL, payload, {
        withCredentials: true,
      });
      
      setModalOpen(false);
      setTimeout(async () => {
        alert("Item successfuly addded");
      }, 150);
      
    } catch (error) {
      if (error instanceof Error) {
        // setError(error.message);
      }
    }
  };

  const patchItem = async () => {
    const payload = {
      name,
      description,
      destinationCount,
      count,
    };

    try {
      const result = await axios.patch(PATCH_ITEM_URL + item.id, payload, {
        withCredentials: true,
      });
      console.log(result);

      setModalOpen(false);
      setTimeout(async () => {
        alert("Item successfuly changed");
      }, 150);
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (await isValidForm()) {
      switch (mode) {
        case "add":
          postItem();
          break;

        case "edit":
          patchItem();
          break;
      }
    }
  };

  const handleResetButton = (event) => {
    event.preventDefault();
    setName(item.name);
    setDescription(item.description);
    setCount(item.count);
    setDestinationCount(item.destinationCount);
  };

  const handlePlusButton = (event) => {
    event.preventDefault();
    if (count < item.destinationCount) {
      setCount((count) => count + 1);
    }
  };

  const handleMinusButton = (event) => {
    event.preventDefault();
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

  return (
    <>
      <form className={styles.editMedicalItem} onSubmit={handleSubmitForm}>
        <div className={styles.name}>
          <Input
            value={name}
            name="Medical name"
            errorMessage={nameError}
            onChange={(e) => setName(e.target.value)}
          />
          <Divider style={{ margin: "25px 0" }} />
        </div>

        <div className={styles.description}>
          <Input
            value={description}
            name="Medical description"
            errorMessage={descriptionError}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Divider style={{ margin: "25px 0" }} />
        </div>

        <div className={styles.destinationCount}>
          <Input
            type="number"
            value={destinationCount}
            name="Destination count"
            errorMessage={destinationCountError}
            onChange={(e) => setDestinationCount(+e.target.value)}
          />

          <Divider style={{ margin: "25px 0" }} />
        </div>

        <div className={styles.count}>
          <WithLabel labelText="Count">
            <Tag color="primary" size="lg" fullWidth>
              {count}
            </Tag>
          </WithLabel>
        </div>
        <WithLabel className={styles.buttons} labelText="Change count">
          <Button
            appearance="primary"
            className={styles.button}
            onClick={handlePlusButton}
          >
            +
          </Button>

          <Button
            appearance="primary"
            className={cn(styles.button, styles.lastButton)}
            onClick={handleMinusButton}
          >
            -
          </Button>
        </WithLabel>

        <Button className={styles.saveBtn} appearance="primary" type="submit">
          {mode == "add" ? "Add" : "Save"}
        </Button>
        <Button
          className={styles.resetBtn}
          appearance="ghost"
          onClick={handleResetButton}
        >
          Reset
        </Button>
      </form>
    </>
  );
};
