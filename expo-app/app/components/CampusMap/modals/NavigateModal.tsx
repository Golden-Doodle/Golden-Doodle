import React, { useState, useEffect, useCallback } from "react";
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

interface NavigateModalProps {
  visible: boolean;
  onClose: () => void;
  buildings: Building[];
  onSelectBuilding: (building: Building) => void;
  markers: CustomMarkerType[];
  onPressSelectOnMap: () => void;
  destination: Coordinates | null ;
  onGetDirections: () => void;  
}

const NavigateModal: React.FC<NavigateModalProps> = ({
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
          <Text style={styles.title}>Search for a Building</Text>

          {/* Search Input */}
          <TextInput
            style={styles.input}
            placeholder="Type building name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />

          {/* Search Results */}
          <FlatList
            data={filteredBuildings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => {
                  onSelectBuilding(item);
                  onClose(); // Close modal after selection
                }}
              >
                <Text style={styles.resultText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          {/* Select on map button */}
          {!destination ? (<TouchableOpacity
            style={styles.selectOnMapButton}
            onPress={onPressSelectOnMap}
          >
            <Text style={styles.selectOnMapText}>Select on Map</Text>
          </TouchableOpacity>) : (
            <TouchableOpacity
            style={styles.selectOnMapButton}
            onPress={onGetDirections}
          >
            <Text style={styles.selectOnMapText}>Get Directions</Text>
          </TouchableOpacity>
          )}

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectOnMapButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(145, 35, 56, 1)",
    borderRadius: 8,
    alignItems: "center",
  },
  selectOnMapText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NavigateModal;
