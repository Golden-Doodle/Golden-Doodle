import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Building } from "@/app/utils/types";

type BuildingInfoModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedBuilding: Building | null | undefined;
  onNavigate?: (latitude: number, longitude: number) => void;
};

const BuildingInfoModal: React.FC<BuildingInfoModalProps> = ({
  visible,
  onClose,
  selectedBuilding,
  onNavigate,
}) => {
  if (selectedBuilding === null || selectedBuilding === undefined || !selectedBuilding) return null;

  const handleNavigate = () => {
    if (onNavigate && selectedBuilding?.coordinates?.length) {
      const { latitude, longitude } = selectedBuilding.coordinates[0];
      onNavigate(latitude, longitude);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Body */}
              <View style={styles.modalBody}>
                <Text style={styles.modalDescription}>
                  {selectedBuilding.description || "No description available"}
                </Text>
              </View>

              {/* Footer */}
              {onNavigate && selectedBuilding.coordinates.length > 0 && (
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.navigateButton}
                    onPress={handleNavigate}
                  >
                    <Text style={styles.navigateButtonText}>
                      Navigate to this Building
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: "#555",
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "center",
  },
  navigateButton: {
    backgroundColor: "#912338",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  navigateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default BuildingInfoModal;
