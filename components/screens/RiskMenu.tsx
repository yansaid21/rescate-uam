import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SectionMenu from "../atoms/SectionMenu";
import { getRiskSituation } from "../../auth/risks";

export default function RisksMenu() {
    const [risks, setRisks] = useState([]);

    const getRisks = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const risksResponse = await getRiskSituation(token, 1); // Reemplaza `1` con el ID adecuado si es necesario.
                setRisks(risksResponse.data);
            }
        } catch (error) {
            console.error("Error al obtener los riesgos:", error);
        }
    };

    useEffect(() => {
        getRisks();
    }, []);

    return (
        <View>
            <SectionMenu color="#F4D73B" text="Añadir riesgo" href="loggedIn/createRisk" logo="warning-amber" />
            {risks.map((risk: any) => (
                <SectionMenu
                    key={risk.id}
                    color="#E36727" 
                    text={risk.name}
                    href="loggedIn/menuProtocols" 
                    logo="warning-amber" 
                />
            ))}
        </View>
    );
}
