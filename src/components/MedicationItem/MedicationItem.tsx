import React from "react";
import { MedicationItemProps } from "./MedicationItem.props";
import styles from "./MedicationItem.module.css";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import WithLabel from "../WithLabel/WithLabel";
import Tag from "../Tag/Tag";
import cn from "classnames";
import useDebounce from "../../hooks/useDebounce";
import { PATCH_ITEM_URL } from "../../constants/url";
import axios from "axios";

export const MedicationItem = ({
  item,
  updateItems,
  handleEditButton,
}: MedicationItemProps): JSX.Element => {
  const [count, setCount] = React.useState<number>(item.count);
  const debouncedCount = useDebounce<number>(count, 500);

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

  const patchItem = async () => {
    const payload = {
      ...item,
      count,
    };

    try {
      const result = await axios.patch(PATCH_ITEM_URL + item.id, payload, {
        withCredentials: true,
      });
      updateItems();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  React.useEffect(() => {
    (async function () {
      if (count !== item.count) {
        patchItem();
      }
    })();
  }, [debouncedCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.changeItemButton}>
        <Button appearance="ghost" onClick={() => handleEditButton()}>
          Change
        </Button>
      </div>
      <div className={styles.medicalItem}>
        <div className={styles.name}>
          <p className={styles.title}>{item.name}</p>
          <p className={styles.subTitle}>Medicalal name</p>
          <Divider className={styles.divider}/>
        </div>

        <div className={styles.description}>
          <p className={styles.descriptionText}>{item.description}</p>
          <p className={styles.subTitle}>Medicalal description</p>
    
        </div>
        <div className={styles.destinationCount}>
          <WithLabel labelText="Destination count">
            <Tag color="primary" size="lg" fullWidth>
              {item.destinationCount}
            </Tag>
          </WithLabel >
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
            appearance={
              item.destinationCount !== count ? "primary" : "disabled"
            }
            className={styles.button}
            onClick={handlePlusButton}
          >
            +
          </Button>

          <Button
             appearance={
              count !== 0 ? "primary" : "disabled"
            }
            className={cn(styles.button, styles.lastButton)}
            onClick={handleMinusButton}
          >
            -
          </Button>
        </WithLabel>
      </div>
    </div>
  );
};
