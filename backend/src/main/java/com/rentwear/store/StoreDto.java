package com.rentwear.store;

public record StoreDto(
        Long id,
        String name,
        String address,
        String city,
        String phone,
        String openingHours,
        String mapUrl) {

    public static StoreDto from(Store s) {
        return new StoreDto(s.getId(), s.getName(), s.getAddress(), s.getCity(),
                s.getPhone(), s.getOpeningHours(), s.getMapUrl());
    }
}
