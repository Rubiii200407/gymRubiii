package com.gymruben.es.repository.specification;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import com.gymruben.es.domain.Deportes;
import com.gymruben.es.service.helper.FilterHelper;

public interface DeportesSpecification {
    public static Specification<Deportes> busquedaDeportes(FilterHelper filterHelper) {
        final Logger log = LoggerFactory.getLogger(DeportesSpecification.class);

        return new Specification<Deportes>() {
            private static final long serialVersionUID = 1L;

            @Override
            public Predicate toPredicate(Root<Deportes> deportes, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                String[] busquedaListadoNombre = (null != filterHelper && null != filterHelper.getNombre())
                    ? filterHelper.getNombre().split(" ")
                    : new String[0];
                String[] busquedaListadoCodigo = (null != filterHelper && null != filterHelper.getCodigo())
                    ? filterHelper.getCodigo().split(" ")
                    : new String[0];

                    Instant[] rangoFechas = (
                        null != filterHelper && filterHelper.getFechaInicio() != null && filterHelper.getFechaFin() != null
                    )
                    ? new Instant[] { filterHelper.getFechaInicio(), filterHelper.getFechaFin() }
                    : new Instant[0];

                List<Predicate> condicionesBusqueda = new ArrayList<>();
                Expression<String> nombre = deportes.get("nombreDeporte").as(String.class);
                Expression<String> codigo = deportes.get("codigo").as(String.class);
                Expression<Instant> fechaDeporte = deportes.get("fechaDeporte").as(Instant.class);
                if (rangoFechas.length == 2) {
                    condicionesBusqueda.add(criteriaBuilder.between(fechaDeporte, rangoFechas[0], rangoFechas[1]));
                }
                if (null != busquedaListadoNombre && busquedaListadoNombre.length > 0) {
                    for (int i = 0; i < busquedaListadoNombre.length; i++) {
                        String searchCriteria = busquedaListadoNombre[i].toLowerCase(Locale.getDefault());
                        condicionesBusqueda.add(criteriaBuilder.like(criteriaBuilder.lower(nombre), "%" + searchCriteria + "%"));
                    }
                }
                
                if (null != busquedaListadoCodigo && busquedaListadoCodigo.length > 0) {
                    for (int i = 0; i < busquedaListadoCodigo.length; i++) {
                        String searchCriteria = busquedaListadoCodigo[i].toLowerCase(Locale.getDefault());

                        int ultimosCaracteres = 6;
                        condicionesBusqueda.add(
                            criteriaBuilder.like(
                                criteriaBuilder.substring(
                                    codigo,
                                    criteriaBuilder.diff(criteriaBuilder.length(codigo), ultimosCaracteres)
                                ),
                                "%" + searchCriteria + "%"
                            )
                        );
                 
                    }
                }
                return criteriaBuilder.and(condicionesBusqueda.toArray(new Predicate[] {}));

            }
        };
    }

   
}

    

