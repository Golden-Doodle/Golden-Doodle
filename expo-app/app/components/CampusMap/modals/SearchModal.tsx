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
          <View style={styles.inputContainer}>
            <MaterialIcons name="search" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Search for destination..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>

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
                <MaterialIcons name="location-on" size={20} color="#007AFF" />
                <Text style={styles.resultText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No results found</Text>
            }
          />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {!destination ? (
              <TouchableOpacity
                style={styles.selectOnMapButton}
                onPress={onPressSelectOnMap}
              >
                <MaterialIcons name="map" size={20} color="#fff" />
                <Text style={styles.selectOnMapText}>Select on Map</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.getDirectionsButton}
                onPress={onGetDirections}
              >
                <MaterialIcons name="directions" size={20} color="#fff" />
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  selectOnMapButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    elevation: 3,
  },
  selectOnMapText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  getDirectionsButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#28A745",
    borderRadius: 12,
    elevation: 3,
  },
  getDirectionsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#D9534F",
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchModal;
