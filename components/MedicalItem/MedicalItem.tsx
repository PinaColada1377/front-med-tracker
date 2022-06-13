import React from "react";
import { MedicalItemProps } from "./MedicalItem.props";
import styles from "./MedicalItem.module.css";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import WithLabel from "../WithLabel/WithLabel";
import Tag from "../Tag/Tag";
import cn from "classnames";

export const MedicalItem = ({
  item,
  handleEditButton,
}: MedicalItemProps): JSX.Element => {
  const [count, setCount] = React.useState<number>(item.count);

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
          <Divider style={{ margin: "10px 0" }} />
        </div>

        <div className={styles.description}>
          <p className={styles.descriptionText}>{item.description}</p>
          <p className={styles.subTitle}>Medicalal description</p>
          {/* <Divider style={{ margin: "10px 0" }} /> */}
        </div>
        <div className={styles.destinationCount}>
          <WithLabel labelText="Destination count">
            <Tag color="primary" size="lg" fullWidth>
              {" "}
              {item.destinationCount}
            </Tag>
          </WithLabel>
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
            appearance={item.destinationCount !== count ? "primary" : "disabled"}
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
      </div>
    </div>
  );
};
