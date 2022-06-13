import { MedicalListProps } from "./MedicalList.props";
import styles from "./MedicalList.module.css";

import axios from "axios";
import { IMedicalItem } from "../../interfaces/medical.interface";
import React from "react";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { MedicalItem } from "../MedicalItem/MedicalItem";
import Modal from "../Modal/Modal";
import { EditMedicalItem } from "../EditMedicaItem/EditMedicalItem";

const initItems: IMedicalItem[] = [
  {
    id: 0,
    name: "Example name",
    description: "Lorem ipsum dolor sit amet",
    count: 0,
    destinationCount: 5,
  },
  {
    id: 1,
    name: "sdac wecdsd",
    description: "Wef cdwecwecwe cwef",
    count: 10,
    destinationCount: 15,
  },
  {
    id: 2,
    name: "Sdac wesdqwd",
    description: "dawe dwedwed wecc wce dfqwefd",
    count: 10,
    destinationCount: 15,
  },
];

export const MedicalList = ({}: MedicalListProps): JSX.Element => {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [editItemMode, setEditItemMode] = React.useState(false);
  const [addItemMode, setAddItemMode] = React.useState(false);

  const [items, setItems] = React.useState(initItems);

  const makeHandleEditButton = (index: number) => {
    return () => {
      setCurrentItemIndex(index);
      setEditItemMode(true);
    };
  };

  const handleAddItemButton = () => {
    setAddItemMode(true);
  };

  const getItems = async () => {
    const GET_ITEM_URL = "/api/proxy/v1/medication/?sort=DESC&order=change_date";

    try {
      const res = await axios.get(GET_ITEM_URL);
      setItems(res.data.items);
    } catch (error) {
      if (error instanceof Error) {
       console.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="wrapper">
      <div className={styles.title}>
        <h1>Your medication list</h1>

        <Button
          className={styles.addItemButton}
          appearance="ghost"
          onClick={handleAddItemButton}
        >
          {" "}
          Add new item
        </Button>
      </div>
      {items.length &&
        items.map((item, index) => {
          return (
            <Card
              className={styles.item}
              key={item.id}
            >
              <MedicalItem
                handleEditButton={makeHandleEditButton(index)}
                item={item}
                key={item.id}
              />
            </Card>
          );
        })}

      {editItemMode && (
        <Modal setModalOpen={setEditItemMode}>
          <div
            style={{
              width: "565px",
              padding: "1rem",
              backgroundColor: "bcbcbc",
            }}
          >
            <EditMedicalItem setModalOpen={setEditItemMode} updateItems={getItems} mode="edit" item={items[currentItemIndex]} />
          </div>
        </Modal>
      )}

      {addItemMode && (
        <Modal setModalOpen={setAddItemMode}>
          <div
            style={{
              width: "565px",
              padding: "1rem",
              backgroundColor: "bcbcbc",
            }}
          >
            <EditMedicalItem  setModalOpen={setAddItemMode} updateItems={getItems} mode="add" item={initItems[0]} />
          </div>
        </Modal>
      )}
    </div>
  );
};
