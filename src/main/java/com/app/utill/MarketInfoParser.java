package com.app.utill;

import com.app.dto.marketInfo.MarketInfoDTO;
import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class MarketInfoParser {

    public static List<MarketInfoDTO> parseMarketInfo(InputStream xmlData) {
        List<MarketInfoDTO> marketInfoList = new ArrayList<>();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(xmlData);
            document.getDocumentElement().normalize();

            NodeList nodeList = document.getElementsByTagName("row");

            for (int i = 0; i < nodeList.getLength(); i++) {
                Node node = nodeList.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    MarketInfoDTO dto = new MarketInfoDTO();

                    dto.setGetDate(getTagValue("GETDATE", element));
                    dto.setPumNm(getTagValue("PUM_NM", element));
                    dto.setGName(getTagValue("G_NAME", element));
                    dto.setAvP(Integer.parseInt(getTagValue("AV_P", element)));
                    dto.setMiP(Integer.parseInt(getTagValue("MI_P", element)));
                    dto.setMaP(Integer.parseInt(getTagValue("MA_P", element)));
                    dto.setSPosGubun(getTagValue("S_POS_GUBUN", element));

                    marketInfoList.add(dto);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return marketInfoList;
    }

    private static String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node = (Node) nodeList.item(0);
        return node != null ? node.getNodeValue() : "";
    }
}
