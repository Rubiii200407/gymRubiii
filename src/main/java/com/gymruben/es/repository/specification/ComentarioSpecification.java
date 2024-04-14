package com.gymruben.es.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.gymruben.es.domain.Comentario;
import com.gymruben.es.domain.Comentario_;

public interface ComentarioSpecification {
    public static Specification<Comentario> findAllByDeportes(Long id) {
        return new Specification<Comentario>() {
            private static final long serialVersionUID = 1L;

            @Override
            public javax.persistence.criteria.Predicate toPredicate(
                Root<Comentario> comentario,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder
            ) {
                return criteriaBuilder.equal(comentario.get(Comentario_.DEPORTES), id);
            }
        };
    }
    public static Specification<Comentario> findAllByClasesOnline(Long id) {
        return new Specification<Comentario>() {
            private static final long serialVersionUID = 1L;

            @Override
            public javax.persistence.criteria.Predicate toPredicate(
                Root<Comentario> comentario,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder
            ) {
                return criteriaBuilder.equal(comentario.get(Comentario_.CLASES_ONLINE), id);
            }
        };
    }
    public static Specification<Comentario> findAllByPlanesEntrenamiento(Long id) {
        return new Specification<Comentario>() {
            private static final long serialVersionUID = 1L;

            @Override
            public javax.persistence.criteria.Predicate toPredicate(
                Root<Comentario> comentario,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder
            ) {
                return criteriaBuilder.equal(comentario.get(Comentario_.PLANES_ENTRENAMIENTO), id);
            }
        };
    }
    public static Specification<Comentario> findAllByPlanesNutricion(Long id) {
        return new Specification<Comentario>() {
            private static final long serialVersionUID = 1L;

            @Override
            public javax.persistence.criteria.Predicate toPredicate(
                Root<Comentario> comentario,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder
            ) {
                return criteriaBuilder.equal(comentario.get(Comentario_.PLANES_NUTRICION), id);
            }
        };
    }
}
