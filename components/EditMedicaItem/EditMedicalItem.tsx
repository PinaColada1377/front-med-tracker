import React from "react";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { EditMedicalItemProps } from "./EditMedicalItem.props";
import styles from "./EditMedicalItem.module.css";
import { Divider } from "../Divider/Divider";
import axios from "axios";
import cn from "classnames";
import WithLabel from "../WithLabel/WithLabel";
import Tag from "../Tag/Tag";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../Input/Input";

interface IEditMedicalItemForm {
  name: string;
  description: string;
  count: number;
  destinationCount: number;
}

export const EditMedicalItem = ({
  item,
  mode,
  updateItems,
  setModalOpen
  
}: EditMedicalItemProps): JSX.Element => {
  const [name, setName] = React.useState<string>(item.name);
  const [description, setDescription] = React.useState<string>(item.description);
  const [destinationCount, setDestinationCount] = React.useState<number>(item.destinationCount);
  const [count, setCount] = React.useState<number>(item.count);

  // const [error, setError] = React.useState<string>();
  // const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  // const {
  //   register,
  //   watch,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   clearErrors,
  // } = useForm<IEditMedicalItemForm>();

  const postItem = async () => {
    const POST_ITEM_URL = "/api/proxy/v1/medication";
    const payload = {
      // name: formData.name,
      // description: formData.description,
      // destinationCount: formData.destinationCount,
      name,
      description,
      destinationCount,
      count,
    };

    try {
      const result = await axios.post(POST_ITEM_URL, payload);
      if (result.status === 200) {
        // setIsSuccess(true);
        updateItems();
        setModalOpen(false);
      } else {
        // setError(result.statusText);
      }
    } catch (error) {
      if (error instanceof Error) {
        // setError(error.message);
      }
    }
  };

  const patchItem = async () => {
    const PATCH_ITEM_URL = "/api/proxy/v1/medication/" + item.id;
    const payload = {
      // name: formData.name,
      // description: formData.description,
      // destinationCount: formData.destinationCount,
      name,
      description,
      destinationCount,
      count,
    };

    try {
      const result = await axios.patch(PATCH_ITEM_URL, payload);
      if (result.status === 200) {
        updateItems();
        setModalOpen(false);
      } else {
        // setError("ERROR");
      }
    } catch (error) {
      if (error instanceof Error) {
        // setError(error.message);
      }
    }
  };

  const handleSubmitButton = () => {
    switch (mode) {
      case "add":
        postItem();
        break;

      case "edit":
        patchItem();
        break;
    }
  };

  const handleResetButton = () => {
    setName(item.name);
    setDescription(item.description);
    setCount(item.count);
    setDestinationCount(item.destinationCount);
  };

  const handlePlusButton = () => {
    if (count < item.destinationCount) {
      setCount((count) => count + 1);
    }
  };

  const handleMinusButton = () => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

  return (
    <>
      <form
        className={styles.editMedicalItem}
        onSubmit={handleSubmitButton}
      >
        <div className={styles.name}>
          <Input value={name} name="Medical name" onChange={(e) => setName(e.target.value)}/>

          
          {/* <div className="inputWrapper">
            <span className="inputLabel">Name</span>
            <input
            defaultValue={item.name}
              // {...register("name", {
              //   required: { value: true, message: "Write medical name" },
              // })}
              placeholder={"name"}
              aria-invalid={errors.name ? true : false}
            />
            {errors.name && (
              <span role="alert" className="errorMessage">
                {errors.name.message}
              </span>
            )}
          </div> */}
          <Divider style={{ margin: "25px 0" }} />
        </div>

        <div className={styles.description}>
        <Input value={description} name="Medical description" onChange={(e) => setDescription(e.target.value)}/>
          {/* <div className="inputWrapper">
            <span className="inputLabel">Description</span>
            <input
              // {...register("description", {
              //   required: { value: true, message: "Write medical description" },
              // })}
              defaultValue={item.description}
              placeholder={"description"}
              
              aria-invalid={errors.description ? true : false}
            />
            {errors.description && (
              <span role="alert" className="errorMessage">
                {errors.description.message}
              </span>
            )}
          </div> */}
          <Divider style={{ margin: "25px 0" }} />
        </div>

        <div className={styles.destinationCount}>

        <Input value={destinationCount} name="Destination count" onChange={(e) => setDestinationCount(+e.target.value)}/>
          {/* <span className="inputLabel">Destination count</span> */}
          {/* <div className="inputWrapper">
            <input
              // {...register("destinationCount", {
              //   required: {
              //     value: true,
              //     message: "Write correct destination count",
              //   },
              // })}
              defaultValue={item.destinationCount}
              type="number"
              aria-invalid={errors.destinationCount ? true : false}
            />
            {errors.destinationCount && (
              <span role="alert" className="errorMessage">
                {errors.destinationCount.message}
              </span>
            )}
          </div> */}
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

        <Button
          className={styles.saveBtn}
          appearance="primary"
          // onClick={handleSubmitButton}
          type="submit"
        >
          Save changes
        </Button>
        <Button
          className={styles.resetBtn}
          appearance="ghost"
          onClick={handleResetButton}
        >
          Reset
        </Button>

        {/* {isSuccess && (
          <div className={cn(styles.success, styles.panel)} role="alert">
            <div className={styles.successTitle}>Submitted</div>
            <div>Succesful submit</div>
            <button
              onClick={() => setIsSuccess(false)}
              className={styles.close}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
        )}
        {error && (
          <div className={cn(styles.error, styles.panel)} role="alert">
            Error
            <button
              onClick={() => setError(undefined)}
              className={styles.close}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
        )} */}
      </form>
    </>
  );
};
