import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Building, Coordinates, CustomMarkerType } from "@/app/utils/types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  buildings: Building[];
  onSelectBuilding: (building: Building) => void;
  markers: CustomMarkerType[];
  onPressSelectOnMap: () => void;
  destination: Coordinates | null;
  onGetDirections: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  buildings,
  onSelectBuilding,
  markers,
  onPressSelectOnMap,
  destination,
  onGetDirections,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBuildings([]); // Reset results when input is empty
      return;
    }

    const timeout = setTimeout(() => {
      // Filter buildings based on the search query
      const results = buildings.filter((building) =>
        building.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBuildings(results);
    }, 300); // Debounce time: 300ms

    return () => clearTimeout(timeout);
  }, [searchQuery, buildings]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <Text style={styles.title}>Select Destination</Text>

          {/* Destination Input */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setSearchQuery("")}
          >
            <MaterialIcons name="location-pin" size={20} color="#D9534F" />
            <TextInput
              style={styles.input}
              placeholder="Search for destination..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </TouchableOpacity>

          {/* Search Results */}
          <FlatList
            data={filteredBuildings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => {
                  onSelectBuilding(item);
                  setSearchQuery(item.name); // Set the selected destination
                }}
              >
                <Text style={styles.resultText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {!destination ? (
              <TouchableOpacity
                style={styles.selectOnMapButton}
                onPress={onPressSelectOnMap}
              >
                <Text style={styles.selectOnMapText}>Select on Map</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.getDirectionsButton}
                onPress={onGetDirections}
              >
                <Text style={styles.getDirectionsText}>Get Directions</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  selectOnMapButton: {
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  selectOnMapText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  getDirectionsButton: {
    padding: 12,
    backgroundColor: "#28A745",
    borderRadius: 8,
    alignItems: "center",
  },
  getDirectionsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#D9534F",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchModal;
